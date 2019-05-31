
/**
 * Constructs the general query config for OpenData API requests.
 */
export function limitOffsetCfg(limit: number, offset=0, otherConfig={}) {
    return Object.assign({ "$limit": limit, "$offset": offset }, otherConfig);
}