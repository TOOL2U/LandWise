import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

/**
 * Upload a document file to Firebase Storage for a booking
 * @param file - The file to upload
 * @param bookingId - The booking ID to associate the file with
 * @returns Promise<string> - The download URL of the uploaded file
 */
export async function uploadBookingDocument(
    file: File,
    bookingId: string
): Promise<string> {
    if (!storage || !isFirebaseConfigured) {
        throw new Error('Firebase Storage not configured');
    }

    try {
        // Create a unique filename with timestamp to avoid collisions
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `bookings/${bookingId}/documents/${timestamp}_${sanitizedFileName}`;

        // Create storage reference
        const storageRef = ref(storage, filePath);

        // Upload file
        const snapshot = await uploadBytes(storageRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(`Failed to upload file: ${file.name}`);
    }
}

/**
 * Upload multiple documents for a booking
 * @param files - Array of files to upload
 * @param bookingId - The booking ID to associate the files with
 * @returns Promise<string[]> - Array of download URLs
 */
export async function uploadBookingDocuments(
    files: File[],
    bookingId: string
): Promise<string[]> {
    const uploadPromises = files.map(file => uploadBookingDocument(file, bookingId));
    return Promise.all(uploadPromises);
}
