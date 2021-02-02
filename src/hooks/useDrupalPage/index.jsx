import axios from 'axios';
import React, {useState, useEffect} from 'react';

async function getPage(rootURL, uuid, entityType, bundle) {
  return await axios.get(`${rootURL}jsonapi/${entityType}/${bundle}/${uuid}`)
  .then((res) => {
    return res.data.data
  });
}

// @TODO move comments to its own hook.
async function getComments(rootURL, uuid) {
  return await axios.get(`${rootURL}jsonapi/comment/comment?include=entity_id&filter[entity_id.id][value]=${uuid}`)
  .then((res) => {
    return res.data.data
  });
}

export const useDrupalEntity = (rootURL, uuid, entityType, bundle, options) => {
  const {includeComments} = options;
  const [entity, setEntity] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchPageData() {
      const data = await getPage(rootURL, uuid, entityType, bundle);
      setEntity(data);
    }
    fetchPageData();
  }, [])
  useEffect(() => {
    async function fetchCommentData() {
      const commentData = await getComments(rootURL, uuid);
      setComments(commentData);
    }
    if (includeComments) {
      fetchCommentData();
    }
  }, [includeComments])
  return {
    entity,
    comments
  }
};