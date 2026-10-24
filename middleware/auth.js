function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  if (req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden — restaurant admins only.');
  }
  next();
}

function requireSuperAdmin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  if (req.session.user.role !== 'superadmin') {
    return res.status(403).send('Forbidden — super admin only.');
  }
  next();
}

<<<<<<< HEAD
// For /api routes: return JSON instead of redirecting to the login page
function requireAuthApi(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
=======
module.exports = { requireAuth, requireAdmin, requireSuperAdmin };


function requireAuthApi(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'You must be logged in to place an order.' });
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
  }
  next();
}

<<<<<<< HEAD
module.exports = { requireAuth, requireAdmin, requireSuperAdmin, requireAuthApi };
=======
module.exports.requireAuthApi = requireAuthApi;
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
