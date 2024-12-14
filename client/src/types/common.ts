/** 
 * Construct the base object shape for services with the provided data. 
 * Whenever D is not provided, @data property will fallback as unknown
*/
export type ServiceResponse<D = unknown> = {
  error: null | string;
  success: boolean;
  data?: D
}