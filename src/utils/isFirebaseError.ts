import { FirebaseError } from 'firebase/app';

/**
 * Util function for testing whether an error payload is of type AxiosError.
 * Supports a generic type T for strongly typed error payload
 * @param err the error payload to test
 * @returns strongly types axios error if test passes
 */
export function isFirebaseError(err: any): err is FirebaseError {
  return err.code ? true : false;
}
