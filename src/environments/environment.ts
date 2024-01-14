// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://api-int.captnboat.com/graphql',
  ws_url: 'wss://api-int.captnboat.com/graphql',
  stripe_key:'pk_test_d3ZIHCwuBx3cBRJoC2t3LMpO',
  harbors_algolia: 'dev_harbors',
  places_algolia: 'dev_places',
  boats_algolia: 'dev_boats',
  regions_algolia: 'regions',
  STRIPE_URL: 'http://js.stripe.com/v3/',
  algolia_id: 'RRJ3LLXC46',
  algolia_key: 'f55797750da636098ac235e799838922'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
