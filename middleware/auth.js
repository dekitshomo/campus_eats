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

// For /api routes: return JSON instead of redirecting to the login page
function requireAuthApi(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  next();
}

module.exports = { requireAuth, requireAdmin, requireSuperAdmin, requireAuthApi };