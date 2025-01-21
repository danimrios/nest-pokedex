export const EnvConfiguratio=() => ({

        environment: process.env.NODE_ENV || "dev",
        mongodb: process.env.MONGODB,
        port: process.env.PORT || 3002,
        DEFAULT_LIMIT: process.env.DEFAULT_LIMIT  || 7,

});