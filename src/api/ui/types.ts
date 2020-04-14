import { UI_STATES } from './constants';

export interface UIState {
  uiState: UnionOf<typeof UI_STATES>;
}
