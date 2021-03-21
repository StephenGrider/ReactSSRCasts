/**
 * User record retrieve sample.
 */
export default async (req, params) => {
    console.log('testGetUserById: req.params.id: ', params.id);
    return params.id;
};
