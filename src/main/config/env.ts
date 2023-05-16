export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-node-api',
  port: process.env.PORT || 3212,
  jwtSecret: process.env.JWT_SECRET || 't54sr#6$%45'
}
