package com.example.backend.Conversation;

import com.example.backend.User.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ConversationRepository extends CrudRepository<ConversationEntity, Long> {

    Optional<ConversationEntity> findByParticipant1AndParticipant2(String participant1, String participant2);


}
