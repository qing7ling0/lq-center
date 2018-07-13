export const DEBUG = true;

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

export const DEV_SERVER = 'http://127.0.0.1:8282/v1';

export const PROD_SERVER = 'http://106.14.138.141:3001/v1';

export const Routers = {
  user: { id:1, name:'用户管理', url: '/home/user' },
  userList: { id:101, name:'用户列表', url: '/home/user/list' },
}