package io.vteial.wyd.util

public class Helper {

    public static String getDomainPrefix(def request, def app) {
        String appEnvName = app.env.name

        String s = 'http://'
        if (appEnvName.equals('Production')) {
            s += app.id + '.appspot.com'
        } else {
            s += request.localAddr + ':' + request.localPort
        }

        return s
    }
}
