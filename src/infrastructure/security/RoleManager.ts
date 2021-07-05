import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

const RoleManager = (() => {
  ac.grant('basic').readOwn('profile').updateOwn('profile');

  ac.grant('supervisor').extend('basic').readAny('profile');

  ac.grant('admin').extend('basic').extend('supervisor').updateAny('profile').deleteAny('profile');

  return ac;
})();

export default RoleManager;
