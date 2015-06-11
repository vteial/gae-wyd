package io.vteial.wyd.service.impl;

import groovyx.gaelyk.GaelykBindings
import groovyx.gaelyk.logging.GroovyLogger
import io.vteial.wyd.dto.SessionDto
import io.vteial.wyd.dto.UserDto
import io.vteial.wyd.service.SessionService
import io.vteial.wyd.service.exceptions.InvalidCredentialException

import javax.servlet.http.HttpSession

@GaelykBindings
public class DefaultSessionService extends AbstractService implements
        SessionService {

    GroovyLogger log = new GroovyLogger(DefaultSessionService.class.getName())

    Map<String, Object> app = [:]

    com.google.appengine.api.users.UserService appUserService

    @Override
    public Map<String, Object> properties(HttpSession session) {
        def props = this.app.clone()

        props.localMode = localMode
        props.sessionDto = session.getAttribute(SESSION_USER_KEY)
        props.sessionId = session.id
        props.applicationUser = user

        return props;
    }

    @Override
    public SessionDto login(HttpSession session, UserDto userDto)
            throws InvalidCredentialException {
        SessionDto sessionDto = null

        if (!localMode && '123' != userDto.password) {
            throw new InvalidCredentialException()
        }

        sessionDto = new SessionDto()
        sessionDto.with {
            userId = userDto.userId
            firstName = 'Guest'
            lastName = 'Guest'
            roleId = 'guest'
        }
        session.setAttribute(SESSION_USER_KEY, sessionDto)

        return sessionDto
    }

    @Override
    public void logout(HttpSession session) {
        session.removeAttribute(SESSION_USER_KEY)
    }
}
