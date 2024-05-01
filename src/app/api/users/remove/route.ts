import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/api/util/cnx';
import User from '../../model/UserModel';

export async function DELETE(req: NextRequest) {
    try {
        connectToDB();

        const { id_User } = await req.json(); // Assurez-vous de récupérer l'id_User à partir de la requête

        const user = await User.findOneAndDelete({ id_User });

        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' });
        }

        console.log('Utilisateur supprimé :', user);

        return NextResponse.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err });
    }
}