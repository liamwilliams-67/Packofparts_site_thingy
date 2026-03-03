// Type declarations for the Google Maps JavaScript API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Window {
  google?: {
    maps: {
      Map: new (
        el: HTMLElement,
        opts: Record<string, unknown>
      ) => google.maps.Map;
      InfoWindow: new (opts: Record<string, unknown>) => google.maps.InfoWindow;
      marker: {
        AdvancedMarkerElement: new (
          opts: Record<string, unknown>
        ) => google.maps.marker.AdvancedMarkerElement;
      };
    };
  };
}

declare namespace google.maps {
  interface Map {
    setCenter(latLng: { lat: number; lng: number }): void;
  }
  interface InfoWindow {
    open(opts: Record<string, unknown>): void;
  }
  namespace marker {
    interface AdvancedMarkerElement {
      addListener(event: string, handler: () => void): void;
    }
  }
}
