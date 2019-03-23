import OperationHistory from './operation.history';

export default interface OperationHistoryRepository {
  register(operationHistory: OperationHistory): Promise<OperationHistory>;
}
