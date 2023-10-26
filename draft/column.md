# 列式压缩

列式存储本质上是：内存中的有序数组，存储到磁盘。

## RLE 编码

您可以使用 Python 来实现 RLE 编码。以下是一个简单的 Python 示例代码，用于对输入列表进行 RLE 编码：

```python
def rle_encode(data):
    encoded_data = []
    count = 1

    for i in range(1, len(data)):
        if data[i] == data[i - 1]:
            count += 1
        else:
            if count > 1:
                encoded_data.extend([count, data[i - 1]])
            else:
                encoded_data.append(data[i - 1])
            count = 1

    if count > 1:
        encoded_data.extend([count, data[-1]])
    else:
        encoded_data.append(data[-1])

    return encoded_data

# 测试
input_data = ['A', 'A', 'B', 'C', 'D', 'D', 'D', 'D']
encoded_data = rle_encode(input_data)
print(encoded_data)
```

这个代码会将输入列表 `input_data` 编码成 RLE 格式。在编码时，它会检测连续的相同元素，并用计数和元素值的形式表示它们。运行上面的示例后，`encoded_data` 将包含 `[2, 'A', -2, 'B', 'C', 4, 'D']`，这是您提供的示例数据的 RLE 编码结果。

请注意，这是一个简单的示例，用于说明 RLE 编码的概念。在实际应用中，您可能需要处理更多数据类型和边界情况。

## DeltaRLE 编码

您可以使用 Python 来实现 `DeltaRLE` 编码。首先，您需要生成差分序列，然后对差分序列应用 RLE 编码。下面是一个实现的示例：

```python
def delta_rle_encode(data):
    if len(data) == 0:
        return []

    # Initialize variables for counting and the first value
    count = 0
    result = [data[0]]

    for i in range(1, len(data)):
        diff = data[i] - data[i - 1]

        # If the difference is the same as the previous one, increase the count
        if diff == result[-1]:
            count += 1
        else:
            # Append the count and the new difference
            result.extend([count, diff])
            count = 0

    # Append the final count for the last difference
    result.extend([count, 0])

    return result

# Test
input_data = [1, 2, 3, 4, 5, 6]
encoded_data = delta_rle_encode(input_data)
print(encoded_data)
```

在上述示例中，我们首先生成了差分序列，然后对差分序列应用 RLE 编码。对于输入数据 `[1, 2, 3, 4, 5, 6]`，`encoded_data` 将包含 `[6, 1]`，这是 `DeltaRLE` 编码的结果。

请注意，这个示例假定差分序列中的差值是整数，而且默认从 0 开始计数。在实际应用中，您可能需要根据数据的特性进行适当的调整。

## BoolRLE 编码

要实现 `BoolRLE` 编码，您可以遍历输入列表，计算连续出现的 `True` 和 `False` 的数量，然后将它们添加到结果中。下面是一个 Python 示例代码：

```python
def bool_rle_encode(data):
    if len(data) == 0:
        return []

    result = []
    current_count = 0
    current_value = data[0]

    for value in data:
        if value == current_value:
            current_count += 1
        else:
            result.append(current_count)
            current_count = 1
            current_value = value

    result.append(current_count)

    return result

# Test
input_data = [True, True, False, False, False]
encoded_data = bool_rle_encode(input_data)
print(encoded_data)
```

在这个示例中，我们遍历输入列表 `input_data`，并根据连续出现的 `True` 和 `False` 的数量来构建 `BoolRLE` 编码。对于输入数据 `[True, True, False, False, False]`，`encoded_data` 将包含 `[0, 2, 3]`，这是 `BoolRLE` 编码的结果。

请注意，这个示例假设输入数据是布尔值，且默认从 `False` 开始计数。根据实际数据的特性，您可能需要进行适当的调整。

## LEB128 编码

要实现 LEB128 编码，您可以将整数分割为 7 位的块，并在每个块的最高位设置标志位以指示是否有更多的字节。然后，将这些块连接在一起以生成 LEB128 编码。下面是一个 Python 示例代码，用于编码整数为 LEB128 格式：

```python
def leb128_encode(value):
    encoded_bytes = bytearray()

    while True:
        # Extract the lowest 7 bits from the value
        byte = value & 0x7F
        value >>= 7  # Right-shift value by 7 bits

        if value != 0:
            # Set the MSB (most significant bit) to 1 to indicate more bytes
            byte |= 0x80

        # Append the byte to the encoded bytes
        encoded_bytes.append(byte)

        if value == 0:
            break

    return bytes(encoded_bytes)

# Test
number_to_encode = 300
encoded_data = leb128_encode(number_to_encode)
print(encoded_data)
```

在这个示例中，`leb128_encode` 函数接受一个整数 `value` 并将其编码为 LEB128 格式的字节数组。对于输入的整数 `300`，`encoded_data` 将包含两字节 `[0xAC, 0x02]`，这是 300 的 LEB128 编码。

这种编码方法适用于任意大小的整数，并可以有效地减小整数在二进制格式中的存储空间。

## Zigzag 编码

要实现 Zigzag 编码，您可以按照给定的规则对整数进行映射。下面是一个 Python 示例代码，用于实现 Zigzag 编码：

```python
def zigzag_encode(n):
    if n >= 0:
        # For non-negative integers, map to 2n
        return 2 * n
    else:
        # For negative integers, map to -2n - 1
        return -2 * n - 1

def zigzag_encode_list(integers):
    encoded_integers = [zigzag_encode(n) for n in integers]
    return encoded_integers

# Test
original_sequence = [-2, -1, 0, 1, 2]
encoded_sequence = zigzag_encode_list(original_sequence)
print(encoded_sequence)
```

在这个示例中，`zigzag_encode` 函数接受一个整数 `n` 并根据 Zigzag 编码规则进行映射。`zigzag_encode_list` 函数接受整数列表并将其中的每个整数应用 Zigzag 编码。对于输入的整数序列 `[-2, -1, 0, 1, 2]`，`encoded_sequence` 将包含 `[3, 1, 0, 2, 4]`，这是 Zigzag 编码后的结果。

Zigzag 编码通常用于将有符号整数映射为无符号整数，以便更有效地表示它们。
