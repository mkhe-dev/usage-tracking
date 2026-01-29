# Test Creation Guidelines

## Structure

All tests **must** follow the "Given, When, Then" format:

- **Given**: Set up the initial context, state, or input.
- **When**: Perform the action or event under test.
- **Then**: Assert the expected outcome.

## Assertions

- Each test **must contain only a single assertion**.
- If multiple outcomes need to be checked, write separate tests for each assertion.

## Example

```python
def test_adds_two_numbers():
    # Given
    a = 2
    b = 3

    # When
    result = add(a, b)

    # Then
    assert result == 5
```

```javascript
test('adds two numbers', () => {
  // Given
  const a = 2;
  const b = 3;

  // When
  const result = add(a, b);

  // Then
  expect(result).toBe(5);
});
```

## Rationale

- The "Given, When, Then" structure improves readability and clarity.
- Single-assertion tests make it easier to identify the cause of a failure and encourage focused, atomic test cases.

## Additional Recommendations

- Name tests clearly to describe the scenario and expected outcome.
- Avoid shared state between tests.
- Use fixtures or setup methods for repeated setup logic, but keep each test's "Given" explicit when possible.
- Prefer descriptive variable names over comments when the meaning is clear.
