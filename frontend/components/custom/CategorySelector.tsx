import { Category } from '@/app/types/category';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CategoryButton } from './CategoryButton';

interface CategorySelectorProps {
    categories: Category[];
    value?: number;
    onChange: (categoryId: number) => void; 
}

export const CategorySelector = ({ 
  categories,
  value, 
  onChange 
}: CategorySelectorProps) => {
  const getCategoryRows = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 4) {
      rows.push(categories.slice(i, i + 4));
    }
    return rows;
  };

  return (
      <View style={styles.categoriesGrid}>
        {getCategoryRows().map((row, rowIndex) => (
          <View key={rowIndex} style={styles.categoryRow}>
            {row.map((category, categoryIndex) => 
              <CategoryButton 
                category={category} 
                index={rowIndex * 4 + categoryIndex}
                value={value}
                onChange={onChange}
              />
            )}
          </View>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
    categoriesGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    categoryRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    }
  });