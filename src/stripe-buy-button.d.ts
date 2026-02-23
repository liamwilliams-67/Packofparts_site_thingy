// Type declaration for the Stripe Buy Button web component
export {};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'buy-button-id': string;
          'publishable-key': string;
        },
        HTMLElement
      >;
    }
  }
}
