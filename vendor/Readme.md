/vendor directory expected usage for React client and admin applications side vendor modules.
This approach allows implementing routes in other vendor modules, and they will be correctly processed for webpack code splitting with @loadable/components.
Routes can be used in npm modules but that approach doesn't allow code splitting usage for routes. Components still can be implemented as npm modules.
