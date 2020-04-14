import * as STATUSES from '../constants/statuses';

export interface AccountState {
  email: string | null;
  status: UnionOf<typeof STATUSES>;
  token: string | null;
}
