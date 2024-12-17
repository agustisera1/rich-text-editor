/**
 * Represents the response structure for services.
 *
 * @template D - The type of the data property. Defaults to `unknown` if not provided.
 *
 * @property {null | string} error - Contains an error message if the service call failed, otherwise null.
 * @property {boolean} success - Indicates whether the service call was successful.
 * @property {D} [data] - The data returned from the service call. Optional.
 * @property {boolean} [pending] - Indicates whether the service call is still pending. Optional.
 */
export type ServiceResponse<D = unknown> = {
  error: null | string;
  success: boolean;
  data?: D;
  pending?: boolean;
};
