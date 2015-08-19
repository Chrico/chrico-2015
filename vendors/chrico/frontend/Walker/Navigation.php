<?php

/**
 * Class ChriCo_Frontend_Walker_Navigation
 */
class ChriCo_Frontend_Walker_Navigation extends Walker_Nav_Menu
{

    /**
     * @see Walker::start_lvl()
     */
    public function start_lvl(&$output, $depth = 0, $args = array())
    {
        $output .= '<div class="chrico-sub-navigation chrico-sub-navigation__depth-' . $depth . '">';
        $output .= "<ul class=\"sub-menu\">";
    }

    /**
     * @see Walker::end_lvl()
     */
    public function end_lvl(&$output, $depth = 0, $args = array())
    {
        $output .= "</ul>\n";
        $output .= '</div>';
    }


}
