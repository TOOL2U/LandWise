'use client';

import { useState, useCallback, useEffect } from 'react';
import { MapPin, X, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Button from './Button';

interface MapLocationPickerProps {
  value?: { lat: number; lng: number; address?: string; mapsLink?: string };
  onChange: (location: { lat: number; lng: number; address?: string; mapsLink?: string }) => void;
  placeholder?: string;
  required?: boolean;
}

// Singleton to track if Google Maps script is loading or loaded
let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;
const googleMapsCallbacks: (() => void)[] = [];

// Load Google Maps script once globally
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (isGoogleMapsLoaded || window.google?.maps) {
      isGoogleMapsLoaded = true;
      resolve();
      return;
    }

    // Currently loading - add to callback queue
    if (isGoogleMapsLoading) {
      googleMapsCallbacks.push(resolve);
      return;
    }

    // Start loading
    isGoogleMapsLoading = true;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      resolve();
      // Resolve all waiting callbacks
      googleMapsCallbacks.forEach(cb => cb());
      googleMapsCallbacks.length = 0;
    };
    
    script.onerror = () => {
      isGoogleMapsLoading = false;
      reject(new Error('Failed to load Google Maps'));
    };
    
    document.head.appendChild(script);
  });
};

export default function MapLocationPicker({ 
  value, 
  onChange, 
  placeholder = "Select land location on map",
  required = false 
}: MapLocationPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualLink, setManualLink] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [mapError, setMapError] = useState(false);
  const [mapsReady, setMapsReady] = useState(false);
  const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here';

  // Load Google Maps script only once when component mounts
  useEffect(() => {
    console.log('🔧 MapLocationPicker mounted. hasApiKey:', hasApiKey);
    
    if (hasApiKey && !isGoogleMapsLoaded && !isGoogleMapsLoading) {
      console.log('📦 Loading Google Maps script...');
      loadGoogleMapsScript(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!)
        .then(() => {
          console.log('✅ Google Maps script loaded');
          setMapsReady(true);
        })
        .catch((error) => {
          console.error('❌ Failed to load Google Maps:', error);
          setMapError(true);
        });
    } else if (isGoogleMapsLoaded || window.google?.maps) {
      console.log('✅ Google Maps already available');
      setMapsReady(true);
    }
  }, [hasApiKey]);

  const initializeMap = useCallback(() => {
    console.log('🗺️ Attempting to initialize map...', {
      hasGoogle: !!window.google?.maps,
      isModalOpen,
      mapsReady,
      hasMapDiv: !!document.getElementById('map-container')
    });

    if (!window.google?.maps || !isModalOpen || !mapsReady) {
      console.log('❌ Map initialization blocked:', {
        noGoogle: !window.google?.maps,
        modalClosed: !isModalOpen,
        mapsNotReady: !mapsReady
      });
      return;
    }

    const mapDiv = document.getElementById('map-container');
    if (!mapDiv) {
      console.log('❌ Map container not found in DOM');
      return;
    }

    console.log('✅ Initializing map...');

    // Default to Thailand center
    const defaultCenter = value || { lat: 13.7563, lng: 100.5018 };

    const newMap = new google.maps.Map(mapDiv, {
      center: defaultCenter,
      zoom: value ? 15 : 7,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const newMarker = new google.maps.Marker({
      map: newMap,
      position: value || null,
      draggable: true,
    });

    // Add click listener to place marker
    newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        newMarker.setPosition(e.latLng);
      }
    });

    // Add search box
    const input = document.getElementById('map-search') as HTMLInputElement;
    if (input) {
      const newSearchBox = new google.maps.places.SearchBox(input);
      newMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      newSearchBox.addListener('places_changed', () => {
        const places = newSearchBox.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          if (place.geometry?.location) {
            newMap.setCenter(place.geometry.location);
            newMap.setZoom(15);
            newMarker.setPosition(place.geometry.location);
          }
        }
      });

      setSearchBox(newSearchBox);
    }

    setMap(newMap);
    setMarker(newMarker);
  }, [isModalOpen, value, mapsReady]);

  useEffect(() => {
    if (isModalOpen && mapsReady) {
      setTimeout(initializeMap, 100);
    }
  }, [isModalOpen, initializeMap, mapsReady]);

  const handleConfirmLocation = () => {
    if (marker) {
      const position = marker.getPosition();
      if (position) {
        const lat = position.lat();
        const lng = position.lng();
        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        
        // Try to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            onChange({
              lat,
              lng,
              address: results[0].formatted_address,
              mapsLink
            });
          } else {
            onChange({ lat, lng, mapsLink });
          }
        });
        
        setIsModalOpen(false);
      }
    }
  };

  const handleManualLinkSubmit = () => {
    // Extract coordinates from Google Maps link
    const coordPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const qPattern = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    
    let match = manualLink.match(coordPattern) || manualLink.match(qPattern);
    
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      
      onChange({
        lat,
        lng,
        mapsLink: manualLink
      });
      
      setManualLink('');
      setShowManualInput(false);
    } else {
      alert('Invalid Google Maps link. Please copy a valid link from Google Maps.');
    }
  };

  const handleClearLocation = () => {
    onChange({ lat: 0, lng: 0, address: '', mapsLink: '' });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!hasApiKey) {
              setShowManualInput(true);
            } else {
              setIsModalOpen(true);
            }
          }}
          className="flex-1 justify-center text-sm sm:text-base py-2.5 sm:py-3"
        >
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          {value?.lat && value?.lng ? 'Location Selected ✓' : placeholder}
        </Button>
        
        {!showManualInput && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowManualInput(true)}
            className="whitespace-nowrap text-sm sm:text-base py-2.5 sm:py-3"
          >
            <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            Or Paste Link
          </Button>
        )}
      </div>

      {/* API Key Warning */}
      {!hasApiKey && !showManualInput && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
          <p className="font-medium">Map picker not configured</p>
          <p className="mt-1">Please use "Or Paste Link" to add your Google Maps location.</p>
        </div>
      )}

      {/* Manual Link Input */}
      {showManualInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualLink}
            onChange={(e) => setManualLink(e.target.value)}
            placeholder="Paste Google Maps link here"
            className="flex-1 px-4 py-2 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-clay focus:border-clay text-sm"
          />
          <Button
            type="button"
            onClick={handleManualLinkSubmit}
            disabled={!manualLink}
            size="sm"
          >
            Add
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowManualInput(false);
              setManualLink('');
            }}
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Selected Location Display */}
      {value?.lat && value?.lng && (
        <div className="flex items-start gap-2 p-3 bg-forest/5 border border-forest/20 rounded-lg text-sm">
          <MapPin className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-forest font-medium">Location selected</p>
            {value.address && (
              <p className="text-charcoal/60 text-xs mt-1 truncate">{value.address}</p>
            )}
            <p className="text-charcoal/60 text-xs mt-1">
              {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
            </p>
          </div>
          {value.mapsLink && (
            <a
              href={value.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay hover:text-clay/80"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            type="button"
            onClick={handleClearLocation}
            className="text-charcoal/40 hover:text-charcoal/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Map Modal */}
      {isModalOpen && hasApiKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-charcoal/10">
              <h3 className="text-lg font-bold text-charcoal">Select Land Location</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-4 border-b border-charcoal/10">
              <input
                id="map-search"
                type="text"
                placeholder="Search for a location..."
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-clay focus:border-clay"
              />
              <p className="text-xs text-charcoal/60 mt-2">
                Search for a place or click on the map to drop a pin
              </p>
            </div>

            {/* Map Container */}
            <div className="flex-1 min-h-[500px] relative bg-gray-100">
              {mapError ? (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center max-w-md">
                    <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-charcoal mb-2">
                      Map Loading Error
                    </h4>
                    <p className="text-sm text-charcoal/60 mb-4">
                      The map couldn't be loaded. Please use the "Paste Google Maps Link" option instead.
                    </p>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setShowManualInput(true);
                      }}
                    >
                      Use Manual Link
                    </Button>
                  </div>
                </div>
              ) : (
                <div id="map-container" className="w-full h-full absolute inset-0" style={{ minHeight: '500px' }} />
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-charcoal/10 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmLocation}
                disabled={mapError}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Confirm Location
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
