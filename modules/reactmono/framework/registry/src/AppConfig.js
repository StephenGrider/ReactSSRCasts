/**
 * Configurations storage.
 */
class AppConfig {
    constructor () {
        this.config = {};
    }

    set (key, data) {
        this.config[key] = data;
    }

    get (key) {
        return this.config[key];
    }
}

export default AppConfig;
