package io.vteial.wyd.service;

import io.vteial.wyd.dto.SessionDto
import io.vteial.wyd.dto.UserDto
import io.vteial.wyd.service.exceptions.InvalidCredentialException

import javax.servlet.http.HttpSession

public interface SessionService {

	static String SESSION_USER_KEY = 'user'

	Map<String, Object> properties(HttpSession session)

	SessionDto login(HttpSession session, UserDto userDto)
	throws InvalidCredentialException

	void logout(HttpSession session)

}
