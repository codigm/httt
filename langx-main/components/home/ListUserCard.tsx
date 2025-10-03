import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { useDatabase } from "@/hooks/useDatabase";
import { useAuth } from "@/hooks/useAuth";
import useResponsive from "@/hooks/useResponsive";
import { ThemedText } from "@/components/themed/atomic/ThemedText";
import { ThemedView } from "@/components/themed/atomic/ThemedView";
import { listUsers } from "@/services/userService";
import UserCard from "./UserCard";
import { Colors } from "@/constants/Colors";

const ListUserCard = ({ filterData }) => {
  const numColumns = useResponsive();
  const { currentUser } = useAuth();

  const {
    data: users,
    loading,
    loadMore,
    refetch,
    hasMore,
  } = useDatabase(listUsers, {
    userId: currentUser.$id,
    filterData,
  });

  const renderFooter = useCallback(() => {
    if (!hasMore)
      return (
        <ThemedText style={{ justifyContent: "center", alignItems: "center" }}>
          All items have been loaded
        </ThemedText>
      );
    if (loading) {
      return (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </ThemedView>
      );
    }
  }, [hasMore, loading]);

  useEffect(() => {
    console.log("recommended page:", users?.length);
  }, [users]);

  const onEndReached = () => {
    if (hasMore && !loading) {
      loadMore();
    }
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={users}
      keyExtractor={(item) => item.$id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => <UserCard item={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default ListUserCard;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
