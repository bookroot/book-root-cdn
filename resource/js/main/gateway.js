const CLIENT_REGISTER=0,CLIENT_TYPE=0,PUSH_OFFER=2,ADD_CANDIDATE=3;var gateway={reg:function(offer,topic_id,offset=0){var downloadRequest={cate:CLIENT_REGISTER,data:{type:CLIENT_TYPE,action:0,sdp:offer,user_token:document.cookie,topic_id,offset}};downloadRequest.data.sdp=transfer.b64Encode(JSON.stringify(offer)),transfer.ws.send(JSON.stringify(downloadRequest))},addCandidate:function(candidate){var addCandidateRequest={cate:ADD_CANDIDATE,data:{candidate:JSON.stringify(candidate)}};console.log(addCandidateRequest),transfer.ws.send(JSON.stringify(addCandidateRequest))}}