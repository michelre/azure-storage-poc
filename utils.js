import slug from 'slug';
import R from 'ramda';

export const createSlugDirectories = ({ country, partner, customer, site, type }) => {
  const slugFn = R.curry(slug)(R.__, { lower: true });
  return [slugFn(country), slugFn(partner), slugFn(customer), slugFn(site), slugFn(type)];
}
