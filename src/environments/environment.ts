// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APIEndpoint: "http://localhost:8080/",
  aws: {
    region: 'eu-central-1',
    accessKeyId: 'AKIASLBR4WTABVT6G5Y6',
    secretAccessKey: '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',
    bucketName: 'essemarket'
  }
};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
