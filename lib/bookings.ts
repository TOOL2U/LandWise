import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Booking, EARLY_ACCESS_LIMIT } from '@/types/booking';

const BOOKINGS_COLLECTION = 'bookings';

export async function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase not configured. Please set up Firebase credentials.');
  }
  
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}

export async function updateBookingPaymentStatus(
  bookingId: string, 
  status: 'paid' | 'failed' | 'refunded',
  stripePaymentId?: string
): Promise<void> {
  if (!db || !isFirebaseConfigured) {
    console.warn('Firebase not configured. Cannot update booking.');
    return;
  }
  
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await updateDoc(bookingRef, {
      paymentStatus: status,
      stripePaymentId,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    throw new Error('Failed to update booking');
  }
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  if (!db || !isFirebaseConfigured) {
    return null;
  }
  
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (bookingSnap.exists()) {
      return {
        id: bookingSnap.id,
        ...bookingSnap.data(),
      } as Booking;
    }
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

export async function getTotalPaidBookings(): Promise<number> {
  if (!db || !isFirebaseConfigured) {
    return 0;
  }
  
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('paymentStatus', '==', 'paid')
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting total bookings:', error);
    return 0;
  }
}

export async function isEarlyAccessAvailable(): Promise<boolean> {
  if (!db || !isFirebaseConfigured) {
    return true; // Default to available if not configured
  }
  
  const totalPaid = await getTotalPaidBookings();
  return totalPaid < EARLY_ACCESS_LIMIT;
}

export async function getBookingsByDate(date: string): Promise<Booking[]> {
  if (!db || !isFirebaseConfigured) {
    return [];
  }
  
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('bookingDate', '==', date),
      where('paymentStatus', '==', 'paid')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking));
  } catch (error) {
    console.error('Error getting bookings by date:', error);
    return [];
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  if (!db || !isFirebaseConfigured) {
    return [];
  }
  
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking));
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return [];
  }
}

export async function isDateAvailable(date: string): Promise<boolean> {
  if (!db || !isFirebaseConfigured) {
    return true; // Default to available if not configured
  }
  
  const bookings = await getBookingsByDate(date);
  return bookings.length === 0;
}
