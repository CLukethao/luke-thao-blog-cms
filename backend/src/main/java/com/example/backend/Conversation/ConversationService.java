package com.example.backend.Conversation;
import com.example.backend.Message.MessageEntity;
import com.example.backend.Message.MessageRepository;
import com.example.backend.RequestParams.ConversationRequest;
import com.example.backend.RequestParams.MessageRequest;
import com.example.backend.User.UserEntity;
import com.example.backend.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ConversationService {

    ConversationRepository conversationRepository;
    UserRepository userRepository;

    MessageRepository messageRepository;


    public ConversationService(ConversationRepository conversationRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Iterable<ConversationEntity> createConversation(ConversationRequest request) {
        Optional<UserEntity> senderExists = userRepository.findById(request.senderId);
        Optional<UserEntity> recipientExists = userRepository.findById(request.recipientId);

        if (senderExists.isEmpty() || recipientExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity sender = senderExists.get();
        UserEntity recipient = recipientExists.get();

        Optional<ConversationEntity> convoExists = conversationRepository.findByParticipant1AndParticipant2(sender.getUsername(), recipient.getUsername());
        Optional<ConversationEntity> convoExists2 = conversationRepository.findByParticipant1AndParticipant2(recipient.getUsername(), sender.getUsername());

        if (convoExists.isPresent()) {
            doSendMessage(sender, convoExists.get(), request.message);
            return sender.getConversations();
        }

        if (convoExists2.isPresent()) {
            doSendMessage(sender, convoExists2.get(), request.message);
            return sender.getConversations();
        }

        ConversationEntity conversation = new ConversationEntity(sender.getUsername(), recipient.getUsername());

        conversationRepository.save(conversation);

        MessageEntity message = new MessageEntity(request.message, sender.getUsername(), conversation);

        messageRepository.save(message);

        conversation.messages.add(message);

        conversationRepository.save(conversation);

        sender.conversations.add(conversation);
        recipient.conversations.add(conversation);

        userRepository.save(sender);
        userRepository.save(recipient);

        return sender.getConversations();
    }

    public Iterable<ConversationEntity> sendMessage(MessageRequest request) {

        Optional<UserEntity> senderExists = userRepository.findById(request.senderId);
        Optional<ConversationEntity> conversationExists = conversationRepository.findById(request.conversationId);

        if (senderExists.isEmpty() || conversationExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity sender = senderExists.get();
        ConversationEntity conversation = conversationExists.get();

        doSendMessage(sender, conversation, request.message);

        return sender.getConversations();
    }

    public void doSendMessage(UserEntity user, ConversationEntity conversation, String message) {
        MessageEntity newMessage = new MessageEntity(message, user.getUsername(), conversation);

        messageRepository.save(newMessage);

        conversation.messages.add(newMessage);

        conversationRepository.save(conversation);
    }

}
