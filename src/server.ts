import createApp from './app';
import { env } from './config/env';
import prisma from './config/database';
import next from 'next';
import path from 'path';

const startServer = async () => {
    try {
        // Prepare Next.js app
        console.log('🚀 Preparing Next.js app...');
        const nextApp = next({ dev: false, dir: path.join(__dirname, '../frontend') });
        await nextApp.prepare();
        const nextHandler = nextApp.getRequestHandler();

        // Create Express app with Next.js handler
        const app = createApp(nextHandler);

        const skipDbCheck = process.env.SKIP_DB_CHECK === 'true';

        // Test database connection
        if (!skipDbCheck) {
            try {
                await prisma.$connect();
                console.log('✅ Database connected successfully');
            } catch (dbError) {
                console.error('❌ Database connection failed:', dbError);
                console.log('⚠️ Starting server without database connection');
                console.log('💡 Make sure DATABASE_URL is set correctly');
            }
        } else {
            console.log('⚠️ Database connection skipped');
        }

        // Start server
        app.listen(env.PORT, () => {
            console.log(`🚀 Server is running on port ${env.PORT}`);
            console.log(`📍 Environment: ${env.NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${env.PORT}/health`);
            console.log('\n📚 Available routes:');
            console.log(`   GET    /      (API status)`);
            console.log('   POST   /auth/login');
            console.log('   POST   /users (ADMIN)');
            console.log('   GET    /users (ADMIN)');
            console.log('   GET    /users/:id (ADMIN)');
            console.log('   PUT    /users/:id (ADMIN)');
            console.log('   DELETE /users/:id (ADMIN)');
            console.log('   POST   /students (ADMIN, SECRETARY)');
            console.log('   GET    /students (ADMIN, SECRETARY)');
            console.log('   GET    /students/:id (ADMIN, SECRETARY)');
            console.log('   PUT    /students/:id (ADMIN, SECRETARY)');
            console.log('   DELETE /students/:id (ADMIN, SECRETARY)');
            console.log('   POST   /inscriptions (ADMIN, SECRETARY)');
            console.log('   GET    /inscriptions (ADMIN, SECRETARY)');
            console.log('   GET    /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   PUT    /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   DELETE /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   POST   /payments (ADMIN)');
            console.log('   GET    /payments (ADMIN)');
            console.log('   GET    /payments/:id (ADMIN)');
            console.log('   POST   /attendance (ADMIN)');
            console.log('   GET    /attendance/student/:id (ADMIN)');
            console.log('   GET    /settings (ADMIN)');
            console.log('   PUT    /settings (ADMIN)');
            console.log('   GET    /transactions (ADMIN)');
            console.log('   POST   /transactions (ADMIN)');
            console.log('   DELETE /transactions/:id (ADMIN)');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

startServer();
