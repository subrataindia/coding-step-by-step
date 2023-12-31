// components/ReadmeViewer.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import EditGithubPage from "./EditGithubPage";
import Author from "./Author";

const MarkdownReader = ({
  username,
  repo,
  branch,
  file,
  authorName = "",
  authorImage = "",
  authorUrl = "",
}) => {
  const [readme, setReadme] = useState(``);
  const url = `https://github.com/${username}/${repo}/blob/${branch}/${file}`;

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${file}`
        );
        setReadme(response.data);
      } catch (error) {
        console.error("Error fetching README:", error);
      }
    };

    fetchReadme();
  }, [username, repo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReactMarkdown>{readme}</ReactMarkdown>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <EditGithubPage url={url} />
        {authorName.length > 0 && (
          <Author
            authorImage={authorImage}
            authorName={authorName}
            authorUrl={authorUrl}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default MarkdownReader;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
});
