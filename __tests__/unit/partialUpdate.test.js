const sqlForPartialUpdate = require('../../helpers/partialUpdate');

describe('partialUpdate()', () => {
  it('should generate proper partial update query with 1 field', function () {
    const { query, values } = sqlForPartialUpdate(
      'users',
      { first_name: 'Test' },
      'username',
      'testuser'
    );

    expect(query).toEqual(
      'UPDATE users SET first_name=$1 WHERE username=$2 RETURNING *'
    );

    expect(values).toEqual(['Test', 'testuser']);
  });
});

describe('partialUpdate', () => {
  it('it returns the correct query string and values for updating db', function () {
    const table = 'test';
    const items = { col1: 'val1', col2: 'val2', _col: '_val', col4: 'val4' };
    const key = 'id';
    const id = 1;

    const result = sqlForPartialUpdate(table, items, key, id);

    expect(result).toEqual(expect.any(Object));
    expect(result.query).toEqual(expect.any(String));
    expect(result.query).not.toContain('_col');
    expect(result.values).toEqual(expect.any(Array));
    expect(result.values.length).toEqual(4);
  });
});
