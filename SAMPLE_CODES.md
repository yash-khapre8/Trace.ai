# Sample Code Snippets for Testing AI Code Mentor

Use these code samples to test the AI review functionality.

## JavaScript Samples

### Example 1: Inefficient Array Search (Has Issues)
```javascript
function findUser(users, id) {
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (users[i].id == id) {
        return users[i];
      }
    }
  }
  return null;
}
```
**Expected Issues:** Logic error (nested loop), performance (O(n²)), style (var instead of const/let), loose equality

---

### Example 2: Poor Error Handling
```javascript
function parseData(jsonString) {
  var data = JSON.parse(jsonString);
  return data.users[0].name;
}
```
**Expected Issues:** No error handling, assumes data structure exists, var instead of const

---

### Example 3: Code with Multiple Issues
```javascript
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}

var cart = [{price: 10}, {price: 20}];
console.log(calculateTotal(cart));
```
**Expected Issues:** Could use reduce(), var instead of const/let, no input validation

---

## Python Samples

### Example 1: Inefficient List Operations
```python
def remove_duplicates(lst):
    result = []
    for item in lst:
        if item not in result:
            result.append(item)
    return result
```
**Expected Issues:** O(n²) complexity, could use set

---

### Example 2: Poor Function Design
```python
def process_data(data):
    # Missing docstring
    result = []
    for i in range(len(data)):
        result.append(data[i] * 2)
    return result
```
**Expected Issues:** No docstring, using index instead of iteration, could use list comprehension

---

## Java Samples

### Example 1: Resource Management Issue
```java
public String readFile(String path) {
    FileReader fr = new FileReader(path);
    BufferedReader br = new BufferedReader(fr);
    String line = br.readLine();
    return line;
}
```
**Expected Issues:** No exception handling, resources not closed, should use try-with-resources

---

### Example 2: Inefficient String Concatenation
```java
public String buildMessage(String[] words) {
    String message = "";
    for (int i = 0; i < words.length; i++) {
        message = message + words[i] + " ";
    }
    return message;
}
```
**Expected Issues:** String concatenation in loop (should use StringBuilder), O(n²) complexity

---

## Good Code Examples (For Comparison)

### JavaScript - Well Written
```javascript
function findUserById(users, targetId) {
  if (!Array.isArray(users) || typeof targetId !== 'number') {
    throw new Error('Invalid input');
  }
  
  return users.find(user => user.id === targetId) ?? null;
}
```

### Python - Well Written
```python
def remove_duplicates(items):
    """Remove duplicate items from a list while preserving order.
    
    Args:
        items: List of items to deduplicate
        
    Returns:
        List with duplicates removed
    """
    return list(dict.fromkeys(items))
```

---

## Edge Cases to Test

### Empty Input
```javascript
function sum(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}
```

### Null Handling
```javascript
function getName(user) {
  return user.name;
}
```

### Type Coercion Issues
```javascript
function add(a, b) {
  return a + b;
}
```

---

## Complex Examples

### Algorithm with Multiple Issues
```javascript
function fibonacci(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage
for (var i = 0; i < 40; i++) {
  console.log(fibonacci(i));
}
```
**Expected Issues:** Exponential time complexity, no memoization, loose equality, var instead of const

---

## Quick Test Command

Copy any of the above snippets and paste into the code editor at `http://localhost:5173/submit`

### Testing Workflow
1. Login to the application
2. Navigate to "New Submission"
3. Select the appropriate language
4. Paste one of the sample codes
5. Click "Submit for Review"
6. Observe the AI feedback
7. Check "Show Learning Mode" for improvements
8. View the submission in Dashboard history
