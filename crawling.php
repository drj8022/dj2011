<?php 
    
    class Crawling { 
       
        const fragment = '_escaped_fragment_';
        
        function Crawling(){ 

            // Initializes the fragment value
            $fragment = (!isset($_REQUEST[self::fragment]) || $_REQUEST[self::fragment] == '') ? '/' : $_REQUEST[self::fragment];
         
            // Parses parameters if any
            $this->parameters = array();
            $arr = explode('?', $fragment);
            if (count($arr) > 1) {
                parse_str($arr[1], $this->parameters);
            }
        
            // Adds support for both /name and /?page=name
            if (isset($this->parameters['page'])) {
                $this->page = '/?page=' . $this->parameters['page'];
            } else {
                $this->page = $arr[0];
            }
            
            // Loads the data file
            $this->doc = new DOMDocument();
            $this->doc->load('projects.xml');
            $this->xp = new DOMXPath($this->doc);
            $this->nodes = $this->xp->query('/projects/project');
            $this->node = $this->xp->query('/projects/project[@href="' . $this->page . '"]')->item(0);
            
            if (!isset($this->node)) {
                header("HTTP/1.0 404 Not Found");
            }
        }
        
        function base() {
            $arr = explode('?', $_SERVER['REQUEST_URI']);
            return $arr[0] != '/' ? preg_replace('/\/$/', '', $arr[0]) : $arr[0];
        }
        
        function title() {
            if (isset($this->node)) {
                $title = $this->node->getAttribute('title');
            } else {
                $title = 'Page not found';
            }
            echo($title);
        }
        
        function nav() {
            $str = '';
            
            // Prepares the navigation links
            foreach ($this->nodes as $node) {
                $href = $node->getAttribute('href');
                $title = $node->getAttribute('title');
                $str .= '<li><a href="' . $this->base() . ($href == '/' ? '' : '?' . self::fragment . '=' . html_entity_decode($href)) . '"' 
                    . ($this->page == $href ? ' class="selected"' : '') . '>' 
                    . $title . '</a></li>';
            }
            echo($str);
        }
    
        function content() {
            $str = '';
            
            // Prepares the content with support for a simple "More..." link
            if (isset($this->node)) {
                foreach ($this->node->childNodes as $node) {
                    if (!isset($this->parameters['more']) && $node->nodeType == XML_COMMENT_NODE && $node->nodeValue == ' page break ') {
                        $str .= '<p><a href="' . $this->page . 
                            (count($this->parameters) == 0 ? '?' : '&') . 'more=true' . '">More...</a></p>';
                        break;
                    } else {
                        $str .= $this->doc->saveXML($node);
                    }
                }
            } else {
                $str .= '<p>Page not found.</p>';
            }
            
            echo(preg_replace_callback('/href="(\/[^"]+|\/)"/', array(get_class($this), 'callback'), $str));
        }
        
        private function callback($m) {
        	return 'href="' . ($m[1] == '/' ? $this->base() : ($this->base() . '?' . self::fragment . '=' . $m[1])) . '"';
        }
    }
    
    $crawling = new Crawling();

?>