### modules-list.json
modules-list.json lists all modules and enabled/disabled (0/1) flags.

### modules.js
modules.js files includes all active modules imports in correct order.
Expected in future this file should be generated with console command base on module-list.json content of active modules list.

These modules are getting checked on route configurations in routeProcessor.js

It would look better if we would go ahead without explicit imports but loadable components doesn't work in that way and need imports usage.
