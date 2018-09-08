import { Dashboard2Module } from './dashboard2.module';

describe('Dashboard2Module', () => {
  let dashboard2Module: Dashboard2Module;

  beforeEach(() => {
    dashboard2Module = new Dashboard2Module();
  });

  it('should create an instance', () => {
    expect(dashboard2Module).toBeTruthy();
  });
});
