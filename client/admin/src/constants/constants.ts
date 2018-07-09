export const DEBUG = false;

/**
 * Restart the saga every time remount.
 */
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';

/**
 * Never stop it even if the component is removed.
 */
export const DAEMON = '@@saga-injector/daemon';

/**
 * Call once until the component is unloaded.
 */
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const DEV_SERVER = 'http://127.0.0.1:8282';

export const PROD_SERVER = 'http://106.14.138.141:3001';
