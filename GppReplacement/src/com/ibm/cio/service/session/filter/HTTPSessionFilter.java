package com.ibm.cio.service.session.filter;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;

public class HTTPSessionFilter implements Filter {

    @Override
    public void destroy() {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
    	Context context = Context.newInstance((HttpServletRequest) request);
    	try {
    	    chain.doFilter(request, response);
    	} finally {
    	    context.release();
    	}
    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {}

}

