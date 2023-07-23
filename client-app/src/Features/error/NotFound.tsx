import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {

    return (

        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Pagina/informatia cautata nu este disponibila!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/clienti'  content = 'Inappoi' />
            </Segment.Inline>
        </Segment >

    )
}