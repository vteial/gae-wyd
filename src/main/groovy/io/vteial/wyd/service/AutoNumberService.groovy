package io.vteial.wyd.service;

import io.vteial.wyd.dto.SessionDto

interface AutoNumberService {

    long getNextNumber(SessionDto sessionUser, String key)
}
