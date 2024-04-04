import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../Constants';

const ViewMoreButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: COLORS.DARKBLUE, fontWeight:500, textAlign:'right' }}>View More</Text>
    </TouchableOpacity>
  );
};

export default ViewMoreButton;