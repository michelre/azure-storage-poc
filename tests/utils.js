import 'should';

import * as utils from '../utils';


describe('Utils', () => {
  it('should create an array of clean directory names', () => {
    utils.createSlugDirectories({ country: 'France', partner: 'R&G project', customer: 'BAR', site: 'M4', type: 'multi' })
      .should.eql(['france', 'randg-project', 'bar', 'm4', 'multi']);
  });
});
