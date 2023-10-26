"""
@link: https://loro-dev.notion.site/Serde-Columnar-Ergonomic-columnar-storage-encoding-crate-7b0c86d6f8d24e4da45a1e2ebd86741c
@link: https://github.com/loro-dev/columnar

RLE 编码简单实现和测试
"""


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


if __name__ == '__main__':
    # 测试 rle_encode 函数
    input_data = ['A', 'A', 'B', 'C', 'D', 'D', 'D', 'D']
    encoded_data = rle_encode(input_data)
    print(encoded_data)

    # 测试 delta_rle_encode 函数
    input_data = [1, 2, 3, 4, 5, 6]
    encoded_data = delta_rle_encode(input_data)
    print(encoded_data)

    # 测试 bool_rle_encode 函数
    input_data = [True, True, False, False, False]
    encoded_data = bool_rle_encode(input_data)
    print(encoded_data)

    # 测试 leb128_encode 函数
    number_to_encode = 300
    encoded_data = leb128_encode(number_to_encode)
    print(encoded_data)

    # 测试 zigzag_encode 函数
    original_sequence = [-2, -1, 0, 1, 2]
    encoded_sequence = zigzag_encode_list(original_sequence)
    print(encoded_sequence)
