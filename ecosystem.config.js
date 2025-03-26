module.exports = {
    apps: [
        {
            name: 'bexpress.com.pk/api/v1',
            script: 'npm run start',
            watch: true, // Enable watch mode
            ignore_watch: ['node_modules'], // Folders to ignore
            watch_options: {
                followSymlinks: false
            }
        }
    ]
}