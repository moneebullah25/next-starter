/**
 * Whether the built in developer tools are enabled.
 *
 * Developer tools are a set of custom tools that can be built into
 * the application using lazy loading. They are not intended for
 * production use.
 */
declare const DEVELOPER_TOOLS_ENABLED: boolean;

/**
 * The current `NODE_ENV` environment the application is running in.
 */
declare const NODE_ENVIRONMENT: "development" | "production";

/**
 * The build id created by Nextjs.
 */
declare const BUILD_ID: string;

/**
 * The hash of the current build.
 */
declare const BUILD_HASH: string;

/**
 * The version of the current build.
 */
declare const BUILD_VERSION: string;

/**
 * The timestamp of the current build.
 */
declare const BUILD_TIMESTAMP: string;

/**
 * The date of the current build.
 */
declare const BUILD_DATE: string;
