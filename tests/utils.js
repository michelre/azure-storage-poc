import 'should';

import * as utils from '../utils';


describe('Utils', () => {
  it('should create an array of clean directory names', () => {
    utils.createSlugDirectories(['France', 'R&G project', 'BAR','M4', 'multi'])
      .should.eql(['france', 'randg-project', 'bar', 'm4', 'multi']);
  });
  it('should make a string corresponding to a directory structure based on an array', () => {
    utils.createDirectoryString(['foo', 'bar']).should.eql('foo/bar');
    utils.createDirectoryString(['foo']).should.eql('foo');
    utils.createDirectoryString([]).should.eql('');
  });
  it('should create the whole directory strucutre', () => {
    utils.createDirectoryStructure(['foo']).should.eql(['foo']);
    utils.createDirectoryStructure(['foo', 'bar', 'baz']).should.eql(['foo', 'foo/bar', 'foo/bar/baz']);
  });
  it('should generate the right report name', () => {
    utils.generateName('monthly_view-energy_pac-creche-culoz_en_2016-07-01_2016-07-31.pdf')
      .should.eql('monthly_view-energy_pac-creche-culoz_en_2016-07-01_2016-07-31(2).pdf');
    utils.generateName('monthly_view-energy_pac-creche-culoz_en_2016-07-01_2016-07-31(2).pdf')
      .should.eql('monthly_view-energy_pac-creche-culoz_en_2016-07-01_2016-07-31(3).pdf');
  })
});
