import * as STATUSES from '../constants/statuses';

export interface AccountState {
  status: UnionOf<typeof STATUSES>;
  token: string | null;
}
